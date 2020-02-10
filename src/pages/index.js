import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { isIE } from 'react-device-detect';
import SEO from 'react-seo-component';
import { useSiteMetadata } from '../hooks/use-site-metadata';


export default ({ data }) => {
  const {
    description,
    title,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();
  if (isIE)
    return (
      <main>
        <h1>IE is not supported.</h1>
        <p>
          Please use a modern browser, download Firefox, Chrome or
          Edge
        </p>
      </main>
    );
  return (
    <>
      <SEO
        title={`Home`}
        titleTemplate={title}
        description={description || `nothin’`}
        image={`${siteUrl}${image}`}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      <main>
        {data.allMdx.nodes.map(
          ({
            id,
            excerpt,
            frontmatter,
            fields: { slug, editLink },
            timeToRead,
          }) => (
            <div className="post_preview" key={id}>
              <Link to={slug}>
                <div className="post_block">
                  {!!frontmatter.cover ? (
                    <Img
                      sizes={frontmatter.cover.childImageSharp.sizes}
                      alt={`cover image`}
                      className="post__img"
                    />
                  ) : null}
                  <div className="post_description">
                    <h1 className="post_title">{frontmatter.title}</h1>
                    <div className="post_info">
                      <div className="post_date">{frontmatter.date}</div>
                      <div className="time_to_read">
                        {timeToRead * 3} minutes to read
                      </div>
                    </div>
                    <p className="text">{excerpt}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </main>
    </>
  );
};

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 100)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          cover {
            publicURL
            childImageSharp {
              sizes(maxWidth: 2000, traceSVG: { color: "#639" }) {
                ...GatsbyImageSharpSizes_tracedSVG
              }
            }
          }
        }
        tableOfContents
        timeToRead
        fields {
          slug
          editLink
        }
      }
    }
  }
`;

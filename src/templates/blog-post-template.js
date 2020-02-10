import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import SEO from 'react-seo-component';
import ReactTooltip from 'react-tooltip';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { A, H1 } from '../components/page-elements';
import {
  Link as GatsbyLink,
  PostDate,
  PostEditOnGitHub,
  PostInfo,
  PostTimeToRead,
} from '../components/shared';
import { useSiteMetadata } from '../hooks/use-site-metadata';

// Переход на следующий и предыдущий пост

const PostNavigationWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing[12]} -${({ theme }) => theme.spacing[8]};
  display: grid;
  grid-template-areas:
    'prev'
    'next';
  ${down('sm')} {
    grid-template-areas:
      'prev'
      'next';
    margin: ${({ theme }) => theme.spacing[0]};
  }
`;

const PrevNextWrapper = styled.div`
  display: grid;
  justify-items: ${props => props.justify};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const Link = styled(GatsbyLink)``;

const Toc = styled.ul`
  position: fixed;
  left: calc(50% + 400px);
  top: 80px;
  max-height: 70vh;
  width: 310px;
  display: flex;
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  ${down('sm')} {
    display: none;
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-family: ${({ theme }) => theme.font.serif};
    margin-top: ${({ theme }) => theme.spacing[2]};
  }
  li {
    line-height: ${({ theme }) => theme.lineHeight.tight};
    margin-top: ${({ theme }) => theme.spacing[3]};
  }
`;

const InnerScroll = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  margin: ${({ theme }) => theme.spacing[3]};
`;

export default ({ data, pageContext }) => {
  const {
    title: siteTitle,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName,
  } = useSiteMetadata();
  const {
    frontmatter,
    body,
    fields: { slug, editLink },
    excerpt,
    tableOfContents,
    timeToRead,
  } = data.mdx;
  const { title, date, cover } = frontmatter;
  const { previous, next } = pageContext;
  return (
    <>
      <SEO
        title={title}
        titleTemplate={siteTitle}
        description={excerpt}
        image={
          cover === null
            ? `${siteUrl}${image}`
            : `${siteUrl}${cover.publicURL}`
        }
        pathname={`${siteUrl}${slug}`}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        article={true}
        publishedDate={date}
        modifiedDate={new Date(Date.now()).toISOString()}
      />
      <H1>{frontmatter.title}</H1>
      <PostInfo>
        <PostDate>{frontmatter.date}</PostDate>
        <PostTimeToRead>
          {timeToRead * 2} minutes to read
        </PostTimeToRead>
        <PostEditOnGitHub>
          <a
            href={editLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit on GitHub
          </a>
        </PostEditOnGitHub>
      </PostInfo>
      <MDXRenderer>{body}</MDXRenderer>
      {typeof tableOfContents.items === 'undefined' ? null : (
        <Toc>
          <InnerScroll>
            <h3>Table of contents</h3>
            {tableOfContents.items.map(i => (
              <li>
                <A href={i.url} key={i.url}>
                  {i.title}
                </A>
              </li>
            ))}
          </InnerScroll>
        </Toc>
      )}
      <ReactTooltip />
      <PostNavigationWrapper>
        <PrevNextWrapper justify={'start'}>
          {previous === false ? null : (
            <>
              {previous && (
                <Link
                  to={previous.fields.slug}
                  aria-label="View previous page"
                  data-tip={`${previous.excerpt.substring(
                    0,
                    180
                  )}...`}
                >
                  ← {previous.frontmatter.title.substring(0, 80)}...
                </Link>
              )}
            </>
          )}
        </PrevNextWrapper>
        <PrevNextWrapper justify={'end'}>
          {next === false ? null : (
            <>
              {next && (
                <Link
                  to={next.fields.slug}
                  aria-label="View next page"
                  data-tip={`${next.excerpt.substring(0, 180)}...`}
                >
                  {next.frontmatter.title.substring(0, 50)}... →
                </Link>
              )}
            </>
          )}
        </PrevNextWrapper>
      </PostNavigationWrapper>
    </>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
        cover {
          publicURL
        }
      }
      body
      excerpt
      tableOfContents
      timeToRead
      fields {
        slug
        editLink
      }
    }
  }
`;

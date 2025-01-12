import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { lighten } from 'polished'

// Components Libraries
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

// Components
import SEO from 'components/SEO'
import Container from '../components/Container'
import Layout from '../components/Layout'
import Share from '../components/Blog/Share'
import TagLabel from '../components/TagLabel'

// Libraries
import { fonts } from '../lib/typography'
import { bpMaxSM } from '../lib/breakpoints'

// Configuration
import config from '../../config/website'
import theme from '../../config/theme'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  const author = mdx.frontmatter.author || config.author
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title
  const banner = mdx.frontmatter.banner
  const tags = mdx.frontmatter.tags

  return (
    <Layout
      site={site}
      frontmatter={mdx.frontmatter}
      stickyHeader={true}
      headerColor={theme.colors.white}
      headerBg={theme.colors.blog_header}
      showBlogHeader={true}
    >
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        css={css`
          width: 100%;
          display: flex;
          color: white;
          a {
            color: white;
            text-decoration: underline;
            :visited {
              color: white;
            }
            :hover {
              color: ${lighten(0.3, theme.brand.primary)};
            }
          }
          h1,
          h2,
          h3 {
            color: white;
          }
        `}
      >
        <Container maxWidth={600}>
          <div>
            {tags.map((tag, i) => {
              return <TagLabel key={i}>{tag}</TagLabel>
            })}
          </div>
          <h1
            css={css`
              text-align: left;
              margin-bottom: 20px;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              margin-bottom: 20px;
              h2,
              span {
                text-align: left;
                font-size: 1rem;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
                margin-bottom: 0.75rem;
              }
            `}
          >
            {author && <h2>{`Writted by ${author}`}</h2>}
            {date && <h2>{`Posted on ${date}`}</h2>}
          </div>
          {banner && (
            <div
              css={css`
                padding: 30px;
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </div>
          )}
          <br />
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <Share
          url={`${config.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        author
        tags
        banner {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`

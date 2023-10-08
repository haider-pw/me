// Define a type for appConfig.cmsBlocks
export type AppConfigCMS = {
  blocks: {
    default: string[];
    pages: Record<string, string[]>; // This allows any string index to be used
  }
  [key: string]: any
};

export type Maybe<T> = T | null;

export interface BlockItem {
  identifier: string,
  block: any
}

export interface CmsBlockState {
  loading: boolean;
  items: BlockItem[];
  blocksData: {
    [key: string]: string[]
  };
}

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface CmsPage {
  /** Identifier of the CMS page */
  identifier?: Maybe<Scalars['String']>;
  /** CMS page content */
  content?: Maybe<Scalars['String']>;
  /** CMS page content heading */
  content_heading?: Maybe<Scalars['String']>;
  /** CMS page meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** CMS page meta keywords */
  meta_keywords?: Maybe<Scalars['String']>;
  /** CMS page meta title */
  meta_title?: Maybe<Scalars['String']>;
  /** CMS page content heading */
  page_layout?: Maybe<Scalars['String']>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect */
  redirect_code: Scalars['Int'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original */
  relative_url?: Maybe<Scalars['String']>;
  /** CMS page title */
  title?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<Scalars['String']>;
  /** URL key of CMS page */
  url_key?: Maybe<Scalars['String']>;
}
export interface CmsPageState {
  loading: boolean;
  items: { [identifier: string]: CmsPage };
}

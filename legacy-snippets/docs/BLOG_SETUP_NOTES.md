# Blog Setup Strategy: Contentful Integration Notes

This document summarizes the discussion and decisions made regarding setting up a blog for the Bobby Brock Insurance website using Contentful as a Headless CMS.

## 1. Goal & Initial Discussion

The primary goal is to establish a process for adding and managing blog posts on the website.

Initial discussion considered several approaches:

*   **Static File Approach (MDX/Markdown):** Simple, version-controlled, but requires developer involvement and redeployment for each post.
*   **Headless CMS (Contentful, Sanity, etc.):** User-friendly interface for non-technical users, separates content from code, allows updates without redeployment. Chosen approach.
*   **Database Solution (Firebase, etc.):** Real-time updates possible, but more complex implementation.
*   **GitHub-based Workflow:** Uses GitHub as a CMS, free, version-controlled, but potentially intimidating UI for non-developers.

## 2. Chosen Approach: Contentful (Headless CMS)

Contentful was selected for its balance of user-friendliness, flexibility, and features suitable for this project.

**Key Benefits Discussed:**

*   **Non-Technical Publishing:** Allows marketing or other staff to create, edit, and publish posts without developer help.
*   **Content Management:** Provides features like version history, scheduled publishing, and preview capabilities.
*   **Performance:** Enables strategies like static site generation (SSG) or incremental static regeneration (ISR) for fast load times.
*   **Separation of Concerns:** Decouples content management from the website's codebase.

## 3. Contentful Setup Process Overview

1.  **Account Setup:** Create a Contentful account and a new "Space".
2.  **Content Modeling:** Define the structure of the content (Content Types and their Fields).
3.  **Frontend Integration:** Connect the React application to Contentful using the SDK and API keys.
4.  **Page Implementation:** Create pages in the React app to fetch and display the blog content (index and detail pages).

## 4. Content Modeling Details

The following Content Types and Fields were defined to structure the blog and related content:

### Content Type: `Blog Post` (`blogPost`)

*   **Internal name** (Entry title setting)
*   **Title** (`title`): Short Text, Required. (Localized in user's setup)
*   **Slug** (`slug`): Short Text, Required, Unique. (Auto-generates from Title)
*   **Published date** (`publishedDate`): Date & Time, Required.
*   **Author** (`author`): Reference (Links to `Author` type), Optional.
*   **Featured image** (`featuredImage`): Media, Optional.
*   **Excerpt** (`excerpt`): Long Text, Optional. (Localized in user's setup)
*   **Content** (`contentBody`): Rich Text, Required. (Localized in user's setup) - *Note: User named this `Content`, differs slightly from earlier `contentBody` suggestion.*
*   **SEO fields** (`seoFields`): Reference (Links to a separate SEO model), Optional. - *Good practice for reusable SEO.*
*   **Related blog posts** (`relatedBlogPosts`): References, Many (Links to other `blogPost` entries), Optional.
*   **Category** (`category`): References, Many (Links to `Category` type), Optional.

### Content Type: `Author` (`author`)

*   **Name** (`name`): Short Text, Required.
*   **Photo** (`photo`): Media, Optional.
*   **Bio** (`bio`): Text, Optional.

### Content Type: `Category` (`category`)

*   **Name** (`name`): Short Text, Required.
*   **Slug** (`slug`): Short Text, Required, Unique.

### Content Type: `Team Member` (`teamMember`) - *Deferred*

*   Discussed as a way to manage the Team page content easily without code changes.
*   **Decision:** Focus on blog first, add this later if needed.
*   Fields discussed: `name`, `jobTitle`, `photo`, `bio`, `displayOrder`.

### Content Type: `Why Choose Us Feature` (`whyChooseUsFeature`) - *Deferred*

*   Discussed for managing repeatable items on the About page.
*   **Decision:** Focus on blog first.
*   Fields discussed: `iconIdentifier`, `title`, `description`.

## 5. Frontend Integration Steps (Current Phase)

These steps connect the React app to Contentful to *read* data:

1.  **Secure Credentials:**
    *   Created `.env.local` file (user action required due to permissions).
    *   Added `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` and `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` (Content **Delivery** API token).
    *   Added `.env*.local` pattern to `.gitignore` to prevent committing secrets.
2.  **Install SDK:** Need to run `npm install contentful` (or yarn/pnpm equivalent).
3.  **Create Utility File:** Create `src/lib/contentful.ts` to house API client setup and fetching functions (`getBlogPosts`, `getBlogPostBySlug`).
4.  **Implement Blog Index Page (`/blog`):** Fetch and display list of posts.
5.  **Implement Blog Detail Page (`/blog/[slug]`):** Fetch and display a single post using its slug.

## 6. Potential Challenges & Mitigation (Discussed)

*   **Content Modeling:** Start flexible, use references, document decisions.
*   **Cost:** Understand pricing, implement caching, monitor usage.
*   **Assets:** Establish image guidelines, use Contentful's image API, lazy load.
*   **Sync:** Use webhooks/ISR for updates, manage expectations on publish times.
*   **Workflow:** Use roles/permissions, scheduled publishing, train users.
*   **Lock-In:** Abstract API calls, keep content logic separate.
*   **Compliance:** Use checklists/required fields for Medicare content.
*   **Maintenance:** Pin dependencies, test updates, monitor changelogs.

## 7. Important Distinction: Reading vs. Importing Data

*   The current setup (`.env.local` with Delivery API token) is for **reading** content *from* Contentful to display on the website.
*   **Importing existing blogs** into Contentful is a separate, one-time migration process:
    1.  **Export:** Get existing blog data into a structured format (JSON, CSV).
    2.  **Transform:** Write a script to map exported data to the Contentful `blogPost` model structure (`fieldId`s).
    3.  **Import:** Use Contentful's **Content Management API (CMA)** and a separate **CMA token** (kept secret, used server-side or in scripts) via `contentful-cli` or a custom script to upload the data *into* Contentful.

## 8. Next Steps (As of Last Discussion)

1.  Confirm `.env.local` is created and populated by the user.
2.  Install the `contentful` SDK package.
3.  Create the `src/lib/contentful.ts` utility file.
4.  Proceed with building the blog pages in the React application. 
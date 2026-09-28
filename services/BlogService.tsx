// BlogService.tsx

const API_BASE = process.env.API;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
}

export interface BlogTag {
    id: string;
    name: string;
    slug: string;
}

export interface BlogComment {
    id: string;
    author_name: string;
    content: string;
    created_at: string; // ISO 8601
}

/** Shape of each item returned by GET /blogs/ */
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    author_name: string;
    category: BlogCategory;
    tags: BlogTag[];
    is_featured: boolean;
    published_at: string; // ISO 8601
    created_at: string; // ISO 8601
    comment_count: number;
    like_count: number;
}

/** Shape returned by GET /blogs/:id/ (list fields + content, updated_at, comments) */
export interface BlogPostDetail extends BlogPost {
    content: string; // Markdown (## headings, - bullets)
    updated_at: string; // ISO 8601
    comments: BlogComment[];
}

/** In case the backend paginates the list (DRF-style). */
interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export class BlogServiceError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "BlogServiceError";
        this.status = status;
    }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    if (!API_BASE) {
        throw new BlogServiceError("NEXT_PUBLIC_API is not defined");
    }

    let res: Response;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            ...init,
            headers: {
                Accept: "application/json",
                ...(init?.headers ?? {}),
            },
        });
    } catch {
        throw new BlogServiceError("Network error: could not reach the server");
    }

    if (!res.ok) {
        if (res.status === 404) {
            throw new BlogServiceError("Blog post not found", 404);
        }
        throw new BlogServiceError(
            `Request failed with status ${res.status}`,
            res.status
        );
    }

    return (await res.json()) as T;
}

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

/**
 * GET {NEXT_PUBLIC_API}/blogs/
 * Returns all blog posts. Handles both a plain array and a paginated
 * `{ results: [...] }` response.
 */
export async function fetchBlogs(init?: RequestInit): Promise<BlogPost[]> {
    const data = await request<BlogPost[] | PaginatedResponse<BlogPost>>(
        "/blogs/",
        init
    );
    return Array.isArray(data) ? data : data.results;
}

/**
 * GET {NEXT_PUBLIC_API}/blogs/:id/
 * Returns a single blog post with full content and comments.
 */
export async function fetchBlogById(
    id: string,
    init?: RequestInit
): Promise<BlogPostDetail> {
    return request<BlogPostDetail>(`/blogs/${encodeURIComponent(id)}/`, init);
}
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import ContentfulService from '@/services/contentfulService';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedBlogs = () => {
  const contentfulService = ContentfulService.getInstance();

  const { data, isLoading, error } = useQuery({
    queryKey: ['featuredBlogs'],
    queryFn: () => contentfulService.getBlogPosts(1, 3),
  });

  const posts = data?.items || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Featured Medicare Resources</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Expert insight to help you understand your Medicare options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="border border-gray-200">
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-4 w-32" />
                </CardFooter>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">
              Failed to load featured blogs. Please try again later.
            </div>
          ) : (
            posts.map(post => (
              <Card key={post.slug} className="border border-gray-200 shadow-card hover:shadow-lg transition-shadow">
                <img 
                  src={post.featuredImage || '/static/blog-placeholder.png'} 
                  alt={post.title} 
                  className="w-full h-60 object-top object-cover overflow-hidden rounded-t"
                />
                <CardHeader className="pb-2">
                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <CardTitle className="text-lg font-bold hover:text-bb-blue transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={`/blog/${post.slug}`} className="text-bb-blue hover:text-bb-light-blue font-medium flex items-center gap-2">
                    Read Article 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button>View All Blogs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;

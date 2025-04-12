export interface Image {
  id: string;
  alt_description: string;
  description: string;
  tags: { title: string }[];
  urls: {
    small: string;
    regular: string;
  };
}

export interface UnsplashApiResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default function RouteDetailPage({ params }: PageProps) {
  return (
    <div>
      <h1>Route ID: {params.slug}</h1>
    </div>
  );
}

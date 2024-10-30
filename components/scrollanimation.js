import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Interactive Background</title>
      </Head>
      <div
        style={{
          backgroundColor: 'black',  // Simple black background
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Welcome to My Website</h1>
        <p>This is an example with a simple black background.</p>
      </div>
    </div>
  );
}

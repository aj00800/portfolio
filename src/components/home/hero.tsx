export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="relative z-10 text-center space-y-6 px-6">
        <h1 className="text-6xl sm:text-8xl font-bold text-foreground">
          Abdullah Jamil
        </h1>
        <p className="text-2xl sm:text-4xl text-primary font-medium">
          Computer Vision & Full-Stack Engineer
        </p>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Building intelligent systems with ML/AI and deploying scalable applications
        </p>
      </div>
    </div>
  );
}

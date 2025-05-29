/* eslint-disable @next/next/no-img-element */
"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  logos = [
    {
      id: "logo-1",
      description: "FastAPI",
      image: "/FastAPI.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "NextJs",
      image: "/Next.js.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "shadcn/ui",
      image: "shadcn-ui-seeklogo.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "PostgreSQL",
      image: "/PostgresSQL.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Mistral",
      image: "/Next.js.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Python",
      image: "/Python.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "TailwindCSS",
      image: "/Tailwind CSS.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "/DXC.svg",
      className: "h-7 w-auto",
    },
  ],
}: Logos3Props) => {
  return (

          <Carousel
            orientation="horizontal"
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
            className="flex flex-col w-fit"
          >
            <CarouselContent className="-ml-4">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-4 flex shrink-0 items-center justify-center dark:bg-neutral-300/10 bg-neutral-900/15 size-12 p-1 rounded-lg border dark:border-neutral-300/10 border-neutral-900/15 border-b-2 border-l-2 ">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

  );
};
const Logos2 = ({
  logos = [
    {
      id: "logo-2",
      description: "NextJs",
      image: "/Next.js.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-1",
      description: "FastAPI",
      image: "/FastAPI.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "PostgreSQL",
      image: "/PostgresSQL.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "TailwindCSS",
      image: "/Next.js.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "fastAPI",
      image: "/Tailwind CSS.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "/DXC.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "shadcn/ui",
      image: "shadcn-ui-seeklogo.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Python",
      image: "/Python.svg",
      className: "h-7 w-auto",
    },
  ],
}: Logos3Props) => {
  return (

          <Carousel
            orientation="horizontal"
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
            className="flex flex-col w-fit"
          >
            <CarouselContent className="-ml-4">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-4 flex shrink-0 items-center justify-center dark:bg-neutral-300/10 bg-neutral-900/15 size-12 p-1 rounded-lg border dark:border-neutral-300/10 border-neutral-900/15 border-b-2 border-l-2 ">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

  );
};

const Logos1 = ({
  logos = [
    {
      id: "logo-3",
      description: "shadcn/ui",
      image: "shadcn-ui-seeklogo.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Python",
      image: "/Python.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "NextJs",
      image: "/Next.js.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "/DXC.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Mistral",
      image: "/shadcn-ui-seeklogo.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "TailwindCSS",
      image: "/Tailwind CSS.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-1",
      description: "FastAPI",
      image: "/FastAPI.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "PostgreSQL",
      image: "/PostgresSQL.svg",
      className: "h-7 w-auto",
    },
  ],
}: Logos3Props) => {
  return (

          <Carousel
            orientation="horizontal"
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
            className="flex flex-col w-fit"
          >
            <CarouselContent className="ml-8">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-4 flex shrink-0 items-center justify-center dark:bg-neutral-300/10 bg-neutral-900/15 size-12 p-1 rounded-lg border dark:border-neutral-300/10 border-neutral-900/15 border-b-2 border-l-2 ">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

  );
};

export { Logos3, Logos2, Logos1 };

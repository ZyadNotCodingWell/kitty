/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./dark-mode";
import { Logos3, Logos1, Logos2 } from "./logos3";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatars: Array<{
    image: string;
    fallback: string;
  }>;
}

interface Hero151Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  testimonial?: Testimonial;
  images: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
}

const Hero151 = ({
  heading = "Next Gen AI Automated Dashboard",
  description = "Finely crafted to adapt to any form of data, offering a solid playground for modular data analysis",
  button = {
    text: "Get Started",
    url: "/login",
  },
  testimonial = {
    quote: "We're not getting enrolled after the internship",
    author: "Avatar Team",
    role: "Not serious interns",
    company: "DXC Technology",
    avatars: [
      { image: "https://shadcnblocks.com/images/block/avatar-1.webp", fallback: "AB" },
      { image: "https://shadcnblocks.com/images/block/avatar-2.webp", fallback: "CD" },
      { image: "https://shadcnblocks.com/images/block/avatar-3.webp", fallback: "EF" },
    ],
  },
  images = {
    first:  "/DXC.svg",
    second: "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
    third:  "/DXC_dark.svg",
    fourth: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    fifth:   "/helloKitty.svg",
    sixth:   "/helloKitty_dark.svg"
  },
}: Hero151Props) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              <h1 className="max-w-[80%] text-4xl leading-tight font-semibold text-foreground lg:text-5xl xl:text-7xl">
                {heading}
              </h1>
              <p className="text-lg leading-relaxed xl:leading-tight text-muted-foreground xl:text-xl text-balance">
                {description}
              </p>
            </div>
            <div className="my-6 lg:my-10 flex items-center gap-2">
              <Button asChild size="default" className="text-sm  py-1 flex">
                <a href={button.url}>{button.text}</a>
              </Button>
              <ModeToggle />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex -space-x-[1.5rem]">
                {testimonial.avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className={`relative z-${index + 1}0 flex h-12 w-12 flex-shrink-0 rounded-full border-2 border-white object-cover`}
                  >
                    <AvatarImage src={avatar.image} alt="" />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground dark:text-muted-2-foreground italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-muted-foreground dark:text-muted-2-foreground">
                  {testimonial.author}, {testimonial.role} @
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="w-full max-w-[50rem]">
              <AspectRatio ratio={1 / 1} className="h-full w-full">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%] p-4">
                  <div className="dark:hidden overflow-hidden rounded-lg border border-muted bg-muted dark:bg-gradient-to-b dark:from-neutral-950 dark:to-black dark:via-neutral-950 p-2 col-span-2">
                    <img
                      src={images.first}
                      alt=""
                      className="object-fit h-full w-full object-center"
                    />
                  </div>
                  <div className="hidden dark:block overflow-hidden rounded-lg border border-muted bg-muted dark:bg-neutral-900/30 p-2 col-span-2">
                    <img
                      src={images.third}
                      alt=""
                      className="object-fit h-full w-full object-center"
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted dark:bg-neutral-900/30 ">
                    <div className="absolute w-[100%] max-w-[37.5rem] overflow-hidden rounded-md">
                      <AspectRatio ratio={1 / 1}>
                        <a href="/dashboard">
                          <img
                            src={images.fifth}
                            alt=""
                            className="dark:hidden size-full object-cover object-center"
                          />
                          <img
                            src={images.sixth}
                            alt=""
                            className="hidden dark:block size-full object-cover object-center"
                            />
                        </a>
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted dark:bg-neutral-900/30 justify-evenly flex flex-col">
                    <Logos3 />
                    <Logos1 />
                    <Logos2 />
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero151 };

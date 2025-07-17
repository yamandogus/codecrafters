/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface CommentItem {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface CommentsGalleryProps {
  title?: string;
  description?: string;
  items: CommentItem[];
}

const data = [
  {
    id: "comment-1",
    author: "Ahmet Yılmaz",
    content: "Harika bir deneyimdi! Çok memnun kaldım ve kesinlikle tavsiye ederim. Hizmet kalitesi gerçekten üst düzey.",
    rating: 5,
    date: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-2",
    author: "Ayşe Demir",
    content: "Çok profesyonel bir yaklaşım ve kaliteli sonuçlar. Beklentilerimin üzerinde bir hizmet aldım.",
    rating: 5,
    date: "2024-01-12",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-3",
    author: "Mehmet Kaya",
    content: "Zamanında teslim ve kaliteli iş. İletişim sürecinde de çok yardımcı oldular. Teşekkürler!",
    rating: 4,
    date: "2024-01-10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-4",
    author: "Fatma Özkan",
    content: "Mükemmel bir deneyim! Çok sabırlı ve anlayışlı bir ekip. Sonuçtan çok memnunum.",
    rating: 5,
    date: "2024-01-08",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "comment-5",
    author: "Ali Çelik",
    content: "Profesyonel yaklaşım ve kaliteli hizmet. Fiyat-performans açısından da çok uygun.",
    rating: 4,
    date: "2024-01-05",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const CommentsGallery = ({
  items = data,
}: CommentsGalleryProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16 container mx-auto max-w-7xl">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              Müşteri Yorumları
            </h2>
            <p className="mt-2 text-muted-foreground md:mt-3 lg:mt-4">
              Müşterilerimizin deneyimlerini ve görüşlerini keşfedin.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex items-end justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <div className="group rounded-xl bg-white p-6 shadow-lg border flex flex-col justify-between h-[260px] w-full min-w-[280px] max-w-[360px]">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.author}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(item.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        &ldquo;{item.content}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { CommentsGallery };

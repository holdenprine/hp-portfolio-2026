import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Slider } from "@/components/ui/slider"

const PROJECTS = [
  {
    title: 'Project 1',
    description: 'Description 1',
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
  },
  {
    title: 'Project 2',
    description: 'Description 2',
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
  },
  {
    title: 'Project 3',
    description: 'Description 3',
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
  },
  {
    title: 'Project 4',
    description: 'Description 4',
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
  },
]

function Projects() {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
  // Snap positions, not cards: with 3 cards per view, 4 cards only have 2 positions
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setIndex(api.selectedScrollSnap())
    const onReInit = () => {
      setSnapCount(api.scrollSnapList().length)
      onSelect()
    }

    onReInit()
    api.on('select', onSelect)
    api.on('reInit', onReInit)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onReInit)
    }
  }, [api])

  return (
    <section className="projects w-full">
      <Carousel setApi={setApi} opts={{ align: 'start' }} className="w-full">
        <CarouselContent>
          {PROJECTS.map((p) => (
            <CarouselItem key={p.title} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <img src={p.image} alt="" className="aspect-video w-full object-cover" />
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{p.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto gap-2">
                  <Button asChild>
                    <a href={p.link} target="_blank" rel="noreferrer">See More</a>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {snapCount > 1 && (
        <Slider
          className="mt-6"
          min={0}
          max={snapCount - 1}
          step={1}
          value={[index]}
          onValueChange={([v]) => api?.scrollTo(v)}
        />
      )}
    </section>
  )
}

export default Projects

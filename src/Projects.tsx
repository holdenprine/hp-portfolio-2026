import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Slider } from "@/components/ui/slider"
import { MdOutlineHeadphones } from "react-icons/md";


const PROJECTS = [
  {
    title: 'HaloboyOfficial',
    description: 'Contracted Webapp built for Musician/Producer, Haloboy',
    icon: <MdOutlineHeadphones />,
    link: 'https://haloboyofficial.com/',
  },
  {
    title: 'Victorise MTB Site',
    description: 'Built out end-to-end test and reworked MTB simulators algorithm',
    icon: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
  },
  {
    title: 'LeafyBuddy Repo',
    description: 'Study Companion releasing soon - follow the dev journey via the repo!',
    icon: 'https://via.placeholder.com/150',
    link: 'https://github.com/holdenprine/Leafy-Buddy-Work-Timer',
  },
  {
    title: 'Mud Muzik',
    description: 'Coding Bootcamp project - built out a mood based music player with a custom API',
    icon: 'https://via.placeholder.com/150',
    link: 'https://github.com/capstone-capos-2022-echo/mood-music',
  },
]

function Projects() {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
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

  useEffect(() => {
    if (!api) return

    const onKeyDown = (e: KeyboardEvent) => {
      // The focused carousel or slider already handled this key itself
      if (e.defaultPrevented) return
      const target = e.target as HTMLElement
      if (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        api.scrollPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        api.scrollNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [api])

  return (
    <section className="projects w-full">
      <Carousel setApi={setApi} opts={{ align: 'start' }} className="w-full">
        <CarouselContent>
          {PROJECTS.map((p) => (
            <CarouselItem key={p.title}>
              <Card className="h-full pt-0">
                <div className="flex aspect-video w-full items-center justify-center bg-muted text-6xl">
                  {p.icon}
                </div>
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

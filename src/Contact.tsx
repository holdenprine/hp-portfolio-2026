import { useState, useEffect } from "react"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,  
} from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Marker, MarkerContent } from "@/components/ui/marker"

type ContactOption = {
  id: string
  label: string
  href: string
}

const PROMPT_FOR_USER = "Thanks for taking a look at the site! If you want to get in touch, you can shoot me an email or view my linkedin and send a message there!";

const OPTIONS: ContactOption[] = [
  {id: 'email', label: 'Email', href: 'mailto:holdenprine404@gmail.com'},
  {id: 'linkedin', label: 'Linkedin', href: 'https://www.linkedin.com/in/holdenprine'},
]

const STEP_DELAY = [
  50,
  Math.min(2200, 600 + PROMPT_FOR_USER.length * 18),
  700,
  550,
  550,
]

const POP_IN = "animate-in fade-in slide-in-from-bottom-2 duration-300"

function Chat() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if(step >= STEP_DELAY.length) return
    const t = setTimeout(() => setStep((s) => s + 1), STEP_DELAY[step])
    return () => clearTimeout(t)
  }, [step])

  const showTyping = step === 1
  const showPrompt = step >= 2
  const optionsShown = Math.max(0, step - 2)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 py-12">
    {showTyping && (
      <Marker role="status" className="animate-in fade-in duration-200">
        <MarkerContent className="shimmer">typing...</MarkerContent>
      </Marker>
    )}
    {showPrompt && (
      <Message className={POP_IN}>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>HP</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>{PROMPT_FOR_USER}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    )}
    {optionsShown > 0 && (
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup className="w-full">
            {OPTIONS.slice(0, optionsShown).map((option) => (
              <Bubble key={option.id} className={POP_IN}>
                <BubbleContent asChild>
                  <a
                    href={option.href}
                    {...(option.href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                  >
                    {option.label}
                  </a>
                </BubbleContent>
              </Bubble>
            ))}
          </BubbleGroup>
        </MessageContent>
      </Message>
    )}
  </div>
  )

}

function Contact({active}: {active: boolean}) {
  return <div className="contact">{active && <Chat />}</div>
}

export default Contact

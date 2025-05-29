import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-t dark:from-neutral-950 dark:to-violet-950/50 dark:via-neutral-950 from-neutral-100 to-violet-100">
      <div className="w-full max-w-sm lg:max-w-md">
        <LoginForm className="rounded-lg border border-neutral-900/30" />
      </div>
    </div>
  )
}

import { createCallable } from 'react-call'
import { Dialog, DialogContent } from './ui/dialog'
import { Button } from './ui/button'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface Props { message: string }
type Response = boolean

export const Confirm = createCallable<Props, Response>(({ call, message }) => (
  <Dialog defaultOpen onOpenChange={(value) => {
    if (!value) call.end(false)
  }}>
    <DialogContent>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>{message}</DialogDescription>
      <div className="flex justify-end gap-4">
        <Button variant="destructive" onClick={() => call.end(true)}>Yes</Button>
        <Button variant="secondary" onClick={() => call.end(false)}>No</Button>
      </div>
    </DialogContent>

  </Dialog>
))

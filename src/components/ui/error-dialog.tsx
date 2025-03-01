import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type ErrorDialogProps = {
    title: string
    description: string
    isErrorDialogOpen: boolean
    closeErrorDialog: () => void
    continueAction?: () => void
}
const ErrorDialog = ({ title, description, isErrorDialogOpen, closeErrorDialog, continueAction }: ErrorDialogProps) => {
    return (
        <AlertDialog open={isErrorDialogOpen}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeErrorDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={continueAction ?? closeErrorDialog}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ErrorDialog;
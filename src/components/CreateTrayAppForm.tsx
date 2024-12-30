import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Icon } from "../modules/TrayApp/components/Icon";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CreateTrayAppFormSchema = z.object({
    trayAppName: z.string().nonempty(),
    trayAppIcon: z.string().nonempty(),
    trayAppSrc: z.string().nonempty(),
})

type ICreateTrayAppForm = z.infer<typeof CreateTrayAppFormSchema>

interface CreateTrayAppFormProps {
    onCreated: () => void
}

export const CreateTrayAppForm = (props: CreateTrayAppFormProps) => {
    const form = useForm<ICreateTrayAppForm>({
        resolver: zodResolver(CreateTrayAppFormSchema)
    })
    const addTrayApp = useTrayAppsStore(s => s.addTrayApp)


    const handleSelectImage = async () => {
        const filePath = await open({ multiple: false, filters: [{ name: "*", extensions: ["png"] }] })

        if (!filePath) return form.setError("trayAppIcon", { message: "Please select an icon" })

        form.clearErrors("trayAppIcon")
        form.setValue("trayAppIcon", filePath)
    }

    const handleCreateTrayApp: SubmitHandler<ICreateTrayAppForm> = async (data) => {
        const { trayAppName, trayAppIcon, trayAppSrc } = data

        addTrayApp({
            name: trayAppName,
            iconSrc: trayAppIcon,
            path: trayAppSrc
        })

        props.onCreated()
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateTrayApp)} className="space-y-8">
            <FormField
                control={form.control}
                name="trayAppName"
                render={({ field }) => {
                    return <FormItem>
                        <FormLabel>App Name</FormLabel>
                        <FormControl>
                            <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                }} />
            <FormField
                control={form.control}
                name="trayAppSrc"
                render={({ field }) => {
                    return <FormItem>
                        <FormLabel>Path/URL</FormLabel>
                        <FormControl>
                            <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormDescription>The Path or URL that will be opened when the icon is clicked</FormDescription>
                        <FormMessage />
                    </FormItem>

                }} />
            {form.watch("trayAppIcon") && <Icon src={convertFileSrc(form.watch("trayAppIcon"))} altName="Selected icon" />}
            <FormField
                control={form.control}
                name="trayAppIcon"
                render={() => {
                    return <FormItem className="flex flex-col">
                        <FormLabel>App Icon</FormLabel>
                        <FormControl className="w-min">
                            <Button type="button" onClick={handleSelectImage}>
                                Select Icon
                            </Button>
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                }} />

            <Button type="submit">Add Tray App</Button>
        </form>
    </Form>
}

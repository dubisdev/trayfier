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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TrayAppActions } from "@/modules/TrayAppAction/TrayAppAction";

const CreateTrayAppFormSchema = z.union([
    z.object({
        trayAppName: z.string().trim().nonempty(),
        trayAppIcon: z.string().trim().nonempty(),
        trayAppType: z.literal(TrayAppActions.CODE),
        trayAppCode: z.string().trim().nonempty(),
    }),
    z.object({
        trayAppName: z.string().trim().nonempty(),
        trayAppIcon: z.string().trim().nonempty(),
        trayAppType: z.literal(TrayAppActions.OPEN_PATH),
        trayAppSrc: z.string().trim().nonempty(),
    })
])

type ICreateTrayAppForm = z.infer<typeof CreateTrayAppFormSchema>

interface CreateTrayAppFormProps {
    onCreated: () => void
}

export const CreateTrayAppForm = (props: CreateTrayAppFormProps) => {
    const form = useForm<ICreateTrayAppForm>({
        resolver: zodResolver(CreateTrayAppFormSchema),
        defaultValues: {
            trayAppName: "",
            trayAppIcon: "",
            trayAppType: TrayAppActions.OPEN_PATH,
            trayAppSrc: ""
        }
    })
    const addTrayApp = useTrayAppsStore(s => s.addTrayApp)


    const handleSelectImage = async () => {
        const filePath = await open({ multiple: false, filters: [{ name: "*", extensions: ["png"] }] })

        if (!filePath) return form.setError("trayAppIcon", { message: "Please select an icon" })

        form.clearErrors("trayAppIcon")
        form.setValue("trayAppIcon", filePath)
    }

    const handleCreateTrayApp: SubmitHandler<ICreateTrayAppForm> = async (data) => {
        const { trayAppName, trayAppIcon, trayAppType } = data

        switch (trayAppType) {
            case TrayAppActions.CODE: {
                const { trayAppCode } = data
                addTrayApp({
                    name: trayAppName,
                    iconSrc: trayAppIcon,
                    actionInfo: {
                        type: TrayAppActions.CODE,
                        configuration: {
                            code: trayAppCode
                        }
                    }
                })
                break
            }

            case TrayAppActions.OPEN_PATH: {
                const { trayAppSrc } = data

                addTrayApp({
                    name: trayAppName,
                    iconSrc: trayAppIcon,
                    actionInfo: {
                        type: TrayAppActions.OPEN_PATH,
                        configuration: {
                            path: trayAppSrc
                        }
                    }
                })

                break
            }
        }

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

            <Tabs defaultValue={TrayAppActions.OPEN_PATH} onValueChange={v => {
                form.setValue("trayAppType", v as TrayAppActions)
            }}>
                <TabsList>
                    <h3 className="p-2 text-sm">App type</h3>
                    <TabsTrigger value={TrayAppActions.OPEN_PATH}>Path</TabsTrigger>
                    <TabsTrigger value={TrayAppActions.CODE}>Code</TabsTrigger>
                </TabsList>
                <TabsContent value={TrayAppActions.OPEN_PATH}>
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
                </TabsContent>
                <TabsContent value={TrayAppActions.CODE}>
                    <FormField
                        control={form.control}
                        name="trayAppCode"
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="console.log('hello world')"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>JavaScript code that will be executed when the icon is clicked.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        }} />
                </TabsContent>
            </Tabs>

            <Button type="submit">Add Tray App</Button>
        </form>
    </Form>
}

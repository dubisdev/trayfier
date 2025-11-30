import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Icon } from "../modules/TrayApp/components/Icon";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";
import { TrayAppAction, TrayAppActions } from "../modules/TrayAppAction/TrayAppAction";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EditTrayAppFormSchema = z.union([
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
    }),
]);

type IEditTrayAppForm = z.infer<typeof EditTrayAppFormSchema>;

interface CreateTrayAppFormProps {
    trayApp: TrayApp;
    onUpdated: () => void;
}

export const UpdateTrayAppForm = ({ trayApp, onUpdated }: CreateTrayAppFormProps) => {
    const form = useForm<IEditTrayAppForm>({
        resolver: zodResolver(EditTrayAppFormSchema),
        defaultValues:
            trayApp.action.type === TrayAppActions.OPEN_PATH
                ? {
                      trayAppName: trayApp.name,
                      trayAppIcon: trayApp.iconSrc,
                      trayAppSrc: trayApp.action.configuration.path,
                      trayAppType: TrayAppActions.OPEN_PATH,
                  }
                : {
                      trayAppName: trayApp.name,
                      trayAppIcon: trayApp.iconSrc,
                      trayAppCode: trayApp.action.configuration.code,
                      trayAppType: TrayAppActions.CODE,
                  },
    });

    const updateTrayApp = useTrayAppsStore((s) => s.updateTrayApp);

    const handleSelectImage = async () => {
        const filePath = await open({
            multiple: false,
            filters: [{ name: "*", extensions: ["png"] }],
        });

        if (!filePath) return;

        form.setValue("trayAppIcon", filePath);
    };

    const handleUpdateTrayApp: SubmitHandler<IEditTrayAppForm> = async (data) => {
        const { trayAppName, trayAppIcon, trayAppType } = data;
        if (trayAppType === TrayAppActions.CODE) {
            const { trayAppCode } = data;
            const action: TrayAppAction = {
                type: TrayAppActions.CODE,
                configuration: {
                    code: trayAppCode,
                },
            };

            updateTrayApp({
                ...trayApp,
                name: trayAppName,
                iconSrc: trayAppIcon,
                action,
            });

            onUpdated();
            return;
        }

        const { trayAppSrc } = data;

        const action: TrayAppAction = {
            type: TrayAppActions.OPEN_PATH,
            configuration: {
                path: trayAppSrc,
            },
        };

        updateTrayApp({
            ...trayApp,
            name: trayAppName,
            iconSrc: trayAppIcon,
            action,
        });

        onUpdated();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdateTrayApp, console.log)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="trayAppName"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>App Name</FormLabel>
                                <FormControl>
                                    <Input {...field} autoComplete="off" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                {trayApp.action.type === TrayAppActions.OPEN_PATH && (
                    <FormField
                        control={form.control}
                        name="trayAppSrc"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Path/URL</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" />
                                    </FormControl>
                                    <FormDescription>
                                        The Path or URL that will be opened when the icon is clicked
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                )}
                {trayApp.action.type === TrayAppActions.CODE && (
                    <FormField
                        control={form.control}
                        name="trayAppCode"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" />
                                    </FormControl>
                                    <FormDescription>
                                        The code that will be executed when the icon is clicked
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                )}
                {form.watch("trayAppIcon") && (
                    <Icon src={convertFileSrc(form.watch("trayAppIcon"))} altName="Selected icon" />
                )}

                <FormField
                    control={form.control}
                    name="trayAppIcon"
                    render={() => {
                        return (
                            <FormItem className="flex flex-col">
                                <FormLabel>App Icon</FormLabel>
                                <FormControl className="w-min">
                                    <Button type="button" onClick={handleSelectImage}>
                                        Select Icon
                                    </Button>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <Button type="submit">Update Tray App</Button>
            </form>
        </Form>
    );
};

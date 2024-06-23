import { EuiCollapsibleNavGroup, EuiPageTemplate } from "@elastic/eui";
import { PropsWithChildren } from "react";

export const LayoutBase = ({ children }: PropsWithChildren) => {
    return <EuiPageTemplate>
        <EuiPageTemplate.Header>
            <EuiCollapsibleNavGroup title="Test" />

        </EuiPageTemplate.Header>
        <EuiPageTemplate.Section>
            {children}
        </EuiPageTemplate.Section>

    </EuiPageTemplate>
}

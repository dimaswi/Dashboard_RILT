import AppLayout from "@/Layouts/AppLayout";

export default function Testing(){
    return (
        <div>
            Ini adalah testing
        </div>
    )
}

Dashboard.layout = (page) => <AppLayout children={page} title="Testing" />

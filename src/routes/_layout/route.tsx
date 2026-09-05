import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MenuLayout } from "@/components/menuLayout";
import { RouterContainer } from "@/components/routerContainer";
export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<RouterContainer>
			<MenuLayout>
				<Outlet />
			</MenuLayout>
		</RouterContainer>
	);
}

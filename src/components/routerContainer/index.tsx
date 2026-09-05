import { AntdContextProvider } from "../antdContextProvider";
import { AppSettingsContextProvider } from "../appSettingsContextProvider";
import { EventListener } from "../eventListener";
import { FetchErrorHandler } from "../fetchErrorHandler";

export const RouterContainer: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<AppSettingsContextProvider>
			<AntdContextProvider>
				<FetchErrorHandler>
					<EventListener>{children}</EventListener>
				</FetchErrorHandler>
			</AntdContextProvider>
		</AppSettingsContextProvider>
	);
};

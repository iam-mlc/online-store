export type ConfigItem<Config_G = Record<string,any>> = {
    label: string;
    config: Config<Config_G>
}

export type Config<Options_G> = Options_G



export type ConfigItems = ConfigItem[];
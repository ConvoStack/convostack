// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const graphqlMarkdownConfig = require("./graphql-markdown.config");

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "ConvoStack Documentation",
    tagline: "ConvoStack",
    url: "https://docs.convostack.ai",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "ConvoStack",
    projectName: "docs",
    plugins: [
        [
            "@graphql-markdown/docusaurus",
            graphqlMarkdownConfig
        ],
        [
            "docusaurus-plugin-typedoc",
            {
                tsconfig: "../packages/convostack/tsconfig.json",
                sort: [
                    "kind",
                    "visibility",
                    "instance-first",
                    "required-first",
                    "alphabetical"
                ],
                excludePrivate: true,
                excludeInternal: true,
                excludeExternals: true,
                excludeNotDocumented: false,
                includeVersion: true,
                sourceLinkTemplate: "https://github.com/ConvoStack/convostack/blob/{gitRevision}/{path}#L{line}",
                readme: "none",
                out: "ts-js-api",
                sidebar: {
                    "categoryLabel": "TS/JS API Reference"
                }
            },
        ]
    ],
    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                blog: false,
                docs: {
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js")
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css")
                },
                gtag: {
                    trackingID: 'G-G489V7QFJM',
                    anonymizeIP: true,
                }
            })
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "ConvoStack",
                logo: {
                    alt: "ConvoStack",
                    src: "img/convostacklogo.png"
                },
                items: [
                    {
                        href: "https://discord.gg/gCGbAm9HXx",
                        label: "Join Discord",
                        position: "right",
                    },
                    {
                        href: "https://twitter.com/ConvoStack",
                        label: "Twitter",
                        position: "right",
                    },
                    {
                        href: "https://github.com/ConvoStack/convostack",
                        label: "GitHub",
                        position: "right",
                    },
                ]
            },
            footer: {
                style: "light",
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} ConvoStack. Built with Docusaurus.`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        })
};

module.exports = config;

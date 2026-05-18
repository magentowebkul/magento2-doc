import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  base: '/magento2-doc/',
  lang: 'en-US',
  shouldPrefetch: false,
  head: [['meta', { name: 'theme-color', content: '#EE672F' }]],
  title: 'Magento 2 Power BI Connector',
  description:
    'Complete documentation for the Magento 2 Power BI Connector module — Azure AD setup, Analytics Dashboard, Visual Query Builder, automated sync via Cron and Message Queues.',
  theme: defaultTheme({
    logo: '/images/webkul-logo.png',
    themePlugins: {
      mediumZoom: {
        selector: ':not(a) > img',
        options: {
          margin: 24,
          background: 'rgba(0, 0, 0, 0.85)',
          scrollOffset: 40,
        },
      },
    },
    navbar: [
      {
        text: 'Buy Now',
        link: 'https://store.webkul.com/magento2-power-bi-connector.html',
      },
      {
        text: 'Support',
        link: 'https://webkul.uvdesk.com/',
      },
      {
        text: 'Guide',
        children: [
          {
            text: 'Getting Started',
            children: [
              { text: 'Introduction', link: '/introduction' },
              { text: 'Quick Start (5 min)', link: '/quick-start' },
              { text: 'Features', link: '/features' },
              { text: 'Installation', link: '/installation' },
              { text: 'Azure AD Setup', link: '/azure-ad-setup' },
              { text: 'Power BI Account Setup', link: '/power-bi-setup' },
            ],
          },
          {
            text: 'Configuration',
            children: [
              { text: 'Module Settings', link: '/settings' },
              { text: 'Access Control (ACL)', link: '/access-control' },
            ],
          },
          {
            text: 'Analytics & Reports',
            children: [
              { text: 'Analytics Dashboard', link: '/dashboard' },
              { text: 'Reports & Dashboards', link: '/reports' },
              { text: 'Smart Alerts', link: '/alerts' },
            ],
          },
          {
            text: 'Data Synchronization',
            children: [
              { text: 'Workspaces & Datasets', link: '/workspaces-datasets-tables' },
              { text: 'Visual Query Builder', link: '/query-builder' },
              { text: 'Load Profiles', link: '/data-load-profiles' },
              { text: 'Automatic Sync & Queues', link: '/sync' },
            ],
          },
          {
            text: 'Advanced',
            children: [
              { text: 'CLI & Queue Management', link: '/rest-api' },
              { text: 'Logs & Retry Queue', link: '/logs' },
              { text: 'Troubleshooting', link: '/troubleshooting' },
              { text: 'FAQ', link: '/faq' },
            ],
          },
        ],
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsible: true,
          children: [
            '/introduction.md',
            '/quick-start.md',
            '/features.md',
            '/installation.md',
            '/azure-ad-setup.md',
            '/power-bi-setup.md',
          ],
        },
        {
          text: 'Configuration',
          collapsible: true,
          children: ['/settings.md', '/access-control.md'],
        },
        {
          text: 'Analytics & Reports',
          collapsible: true,
          children: ['/dashboard.md', '/reports.md', '/alerts.md'],
        },
        {
          text: 'Data Synchronization',
          collapsible: true,
          children: [
            '/workspaces-datasets-tables.md',
            '/query-builder.md',
            '/data-load-profiles.md',
            '/sync.md',
          ],
        },
        {
          text: 'Advanced',
          collapsible: true,
          children: ['/rest-api.md', '/logs.md', '/troubleshooting.md', '/faq.md'],
        },
      ],
    },
  }),
  bundler: webpackBundler(),
  plugins: [
    searchPlugin({
      maxSuggestions: 10,
    }),
    pwaPlugin(),
  ],
})

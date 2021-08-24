import Link from 'next/link'
import IconBar from '../nav/IconBar'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Divider, Menu, Typography, Input, IconSearch, Button, IconPlus } from '@supabase/ui'

type Sidebar = {
  title: string
  searchable?: boolean
  categories?: SidebarItems[]
  button?: SidebarButton
}
type SidebarItems = {
  label: string
  links: SidebarLinks[]
}
type SidebarLinks = {
  label: string
  href: string
}

type SidebarButton = {
  label: string
  action: (e: any) => void
}

export default function DashboardLayout({
  children,
  title,
  sidebar,
}: {
  children: ReactElement
  title?: string
  sidebar?: Sidebar
}) {
  return (
    <>
      <Head>
        <title>Supabase Studio {title && `| ${title}`}</title>
        <meta name="description" content="Supabase Studio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <div className="w-14 h-screen bg-sidebar-light dark:bg-sidebar-dark border-r dark:border-dark">
          <IconBar />
        </div>
        {sidebar && <SidebarMenu sidebar={sidebar} />}
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}

const SidebarMenu = ({ sidebar }: { sidebar: Sidebar }) => {
  return (
    <div
      className={[
        'w-64 h-screen overflow-autohide-scrollbar border-r ', // Layout
        'bg-sidebar-linkbar-light', // Light mode
        'dark:bg-sidebar-linkbar-dark dark:border-dark ', // Dark mode
      ].join(' ')}
    >
      <Typography.Title level={3} className="border-b p-4">
        {sidebar.title}
      </Typography.Title>

      <Menu className="px-4">
        {sidebar.button && (
          <div className="mt-8">
            <Button
              icon={<IconPlus />}
              shadow={true}
              textAlign="left"
              block
              type="text"
              onClick={sidebar.button?.action}
            >
              {sidebar.button.label}
            </Button>
          </div>
        )}

        {sidebar.searchable && (
          <div>
            <Input
              borderless
              className="mb-8"
              type="search"
              placeholder="Search"
              icon={<IconSearch />}
            />
          </div>
        )}
        {sidebar.categories?.map((category) => (
          <div key={category.label} className="mt-8">
            <Menu.Group title={category.label} />

            {category.links.map((link) => (
              <Link href={link.href} key={link.href}>
                <a>
                  <Menu.Item>{link.label}</Menu.Item>
                </a>
              </Link>
            ))}

            <Divider className="my-4" />
          </div>
        ))}
      </Menu>
    </div>
  )
}
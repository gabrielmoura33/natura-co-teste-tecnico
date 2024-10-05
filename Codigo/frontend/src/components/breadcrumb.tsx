import React from 'react'

interface BreadcrumbRoute {
  title: string
  href?: string
}

interface BreadcrumbProps {
  routes: BreadcrumbRoute[]
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol>
        {routes.map((route, index) => (
          <li key={index}>
            {route.href ? (
              <a href={route.href}>{route.title}</a>
            ) : (
              <span>{route.title}</span>
            )}
            {index < routes.length - 1 && <span> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export const CartBreadcrumb = () => {
  const routes = [{ title: 'Inicio', href: '/' }, { title: 'Carrinho' }]

  return <Breadcrumb routes={routes} />
}

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from '@chakra-ui/react'
import styles from './BotoesHeader.module.scss'
import { Link } from 'react-router-dom'

export default function CreateBotoesHeader(){
  return(
    <Breadcrumb className={styles.botoes} separator=''>
      <BreadcrumbItem isCurrentPage>
        <Link to={'/'}>
        <BreadcrumbLink>Inicio</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Link to={'/ReceitasEncontradas'}>
        <BreadcrumbLink>Receitas</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Login</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}


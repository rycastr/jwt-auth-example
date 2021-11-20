import { Image, ImageProps } from '@chakra-ui/react'

import LogoJWT from '../assets/logo.svg'

export const Logo = (props: ImageProps) => {
  return <Image {...props} src={LogoJWT} />
}

import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Tag } from '@chakra-ui/react'
import styles from './CardReceitaEncontrada.module.scss';

export default function CriarCardReceitaEncontrada({objeto}:any){
    
    return(
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{objeto.nome}</Heading>

                    <Text py='2'>
                       {objeto.resumo}
                    </Text>
                </CardBody>

                    <CardFooter className={styles.cardFooter}>
                        <Button variant='solid' colorScheme='blue'>
                            Visualizar Receita
                        </Button>
                        <div className={styles.tags}>
                            <Tag>Simples</Tag>
                            <Tag>Rápido</Tag>
                            <Tag>3 porções</Tag>
                        </div>
                    </CardFooter>
            </Stack>
        </Card>
    )
}
import { useNumberInput } from '@chakra-ui/react'
import { Button, Input, HStack } from '@chakra-ui/react'

 export default function CriarInputSpinner() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 50,
        defaultValue: 0,
        min: 0,
        max: 5000,
      })
  
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()
  
    return (
      <HStack maxW='320px'>
        <Button {...inc}>+</Button>
        <Input {...input} />
        <Button {...dec}>-</Button>
      </HStack>
    )
  }
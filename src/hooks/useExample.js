import { ref } from 'vue'

const useExample = () => {
  const example = ref('example')
  return {
    example
  }
}

export default useExample

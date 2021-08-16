import React, { Component } from 'react'

class ErrorBoundary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // activo: false,
      hasError: false
    }
  }

  /*estaActivo = () => {
    return this.state.activo ? "Activo" : "No activo"
  }
  
  onClickHandler = () => {
    this.setState({ activo: true })
  }

  componentDidMount() {
    console.log('El componente se ha montado')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('El componente se ha actualizado')
  }

  componentWillUnmount() {
    console.log('El componente se ha desmontado')
  }*/

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    
  }

  render() {
    return (
      this.state.hasError ? <h1>Hubo un error</h1> : this.props.children
    )
  }
}

export default ErrorBoundary

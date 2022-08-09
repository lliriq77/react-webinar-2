import item from "./components/item";

class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }

  /**
   * Создание записи
   */
  addItem(code) {
    this.setState({
      ...this.state,
      shoppingCart: (this.state.shoppingCart.find(item => item.code == code))
        ? this.state.shoppingCart.map(item=>{
          if (item.code == code) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          else return item; 
          })
        : this.state.shoppingCart.concat(
        this.state.items.filter(item => item.code == code).map(item => {
          return {...item,
            qty: 1,
          }
        })
        )
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  deleteCartItem(code) {
    this.setState({
      ...this.state,
      shoppingCart: this.getState().shoppingCart.filter(item => item.code !== code)
    });
}
}

export default Store;
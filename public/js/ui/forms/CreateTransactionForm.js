/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {

    const user = User.current();

    Account.list(user, (err, response) => {
      if (response.success) {
        const select = this.element.querySelector('.accounts-select');
        let html = response.data.reduce((accumulator, item) => {
          return accumulator += `<option value="${item.id}">${item.name}</option>`;
        }, '')
        select.innerHTML = html;
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        let form = (this.element.id === 'new-income-form') ? 'newIncome' : 'newExpense';
        const modal = App.getModal(form);
        modal.close();
        App.update();
      }
    })

  }
}
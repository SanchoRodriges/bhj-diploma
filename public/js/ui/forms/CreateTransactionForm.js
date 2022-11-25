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
      console.log(response);
      if (response.success) {
        const incomeAccountsList = document.querySelector('#income-accounts-list');
        const expenseAccountsList = document.querySelector('#expense-accounts-list');
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          incomeAccountsList.innerHTML += `<option value="${data[i].id}">${data[i].name}</option>`;
          expenseAccountsList.innerHTML += `<option value="${data[i].id}">${data[i].name}</option>`;
        }

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
        this.element.closest('.modal').style.display = '';
        App.update();
      }
    })

  }
}
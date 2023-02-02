const app = new Vue({
  el: "#quiz",
  data: {
    stageNow: 0,
    plane: false,
    finish: true,
    stages: [
      {
        text: "На каком этапе благоустройство?",
        description: "Лучше позаботиться о системе заранее. На подготовительные работы потратиться минимум средств и времени, но в итоге вы сэкономите на итоговой смете",
        type: 0,
        percents: 0,
        answers: [
          {
            title: "Обжитой участок",
            image: "step1.png"
          },
          {
            title: "В процессе строительства",
            image: "step1.1.png",
          }
        ],
        checkedValue: null,
      },
      {
        text: "Можно ли мочить дорожки?",
        description: "Если мочить дорожки, то стоимость автополива сократится, так как потребуется меньшее количество головок. Дорожки останутся сухими, если их обходить, но небольшое количество водяной пыли может попадать на них",
        percents: 0,
        type: 0,
        answers: [
          {
            title: "Да, можно",
            image: "step2.png"
          },
          {
            title: "Нет, максимально сухие",
            image: "step2.1.png"
          },
        ],
        checkedValue: null,
      },
      {
        text: "Земляные работы включать в стоимость?",
        description: "Если у вас есть свои рабочие, то мы предоставим схему прокопки траншей и расположения закладных. Если нет, то аккуратно выполним все работы с фотофиксацией",
        percents: 14,
        type: 0,
        answers: [
          {
            title: "Да, с восстановлением газона",
            image: "step3.1.png"
          },
          {
            title: "Да, без восстановления газона",
            image: "step3.1.1.png"
          },
          {
            title: "Нет, есть свои рабочие",
            image: "step3.1.2.png"
          },
        ],
        checkedValue: null,
      },
      {
        text: "Земляные работы включать в стоимость?",
        description: "Если мочить дорожки, то стоимость автополива сократится, так как потребуется меньшее количество головок. Дорожки останутся сухими, если их обходить, но небольшое количество водяной пыли может попадать на них",
        percents: 0,
        type: 0,
        answers: [
          {
            title: "Да, включать",
            image: "step3.2.png"
          },
          {
            title: "Нет, есть свои рабочие или грунт будет досыпаться более 30 см",
            image: "step3.2.1.png"
          },
        ],
        checkedValue: null,
      },
      {
        text: "Откуда планируется брать воду для полива?",
        description: "Если параметры водоисточника не будут соответствовать оптимальным для системы автополива (давление 3,5 атм и расход ниже 2 м³), тогда придется установить накопительную емкость с дополнительным насосом. Емкость и насос — самые дорогие позиции в системе",
        percents: 29,
        type: 1,
        answers: [
          {
            title: "Водопровод",
            image: "step4.png"
          },
          {
            title: "Скважина",
            image: "step4.1.png"
          },
          {
            title: "Колодец",
            image: "step4.2.png"
          },
          {
            title: "Водоем",
            image: "step4.3.png"
          },
        ],
        checkedValue: null,
      },
      {
        text: "Какой контроллер полива установить?",
        description: "Система с удаленным доступом не только удобна для контроля и настройки системы, но и автоматически регулирует график на основе высокоточных местных погодных данных",
        percents: 43,
        type: 0,
        answers: [
          {
            title: "Обычный, с ручным управлением",
            image: "step5.png"
          },
          {
            title: "С удаленным управлением",
            image: "step5.1.png"
          },
        ],
        checkedValue: null,
      },
      {
        text: "На участке есть значительные перепады высот?",
        description: "Если на участке есть значительные перепады высот, то в нижних точках полива приходится применять поливочные головки с обратными клапанами, чтобы исключить самопроизвольное сочение воды из этих мест.",
        percents: 57,
        type: 0,
        answers: [
          {
            title: "Нет, участок ровыный",
            image: "step6.png"
          },
          {
            title: "Да (склоны, подъемы, стенки)",
            image: "step6.1.png"
          },
        ],
        checkedValue: null,
      },
      {
        text: "У вас есть план участка?",
        description: "Точно ответить на вопрос стоимости системы можно только после предварительного проектирования, при наличии плана участка и необходимых вводных",
        percents: 57,
        type: 2,
        answers: [
          {
            title: "Да, хочу точный расчет",
            image: "step7.svg"
          },
          {
            title: "Нет, хочу узнать среднюю стоимость",
            image: "step7.1.svg"
          },
          {
            title: "Нет, мне нужен выезд специалиста для замеров",
            image: "step7.2.svg"
          },
        ],
        checkedValue: null,
      },
    ],
    form: {
      name: {
        status: 'error',
        value: ""
      },
      email: {
        status: 'none',
        value: ""
      },
      phone: {
        status: 'none',
        value: ""
      },
      mkad: {
        status: 'none',
        value: ""
      },
      square: {
        status: 'none',
        value: ""
      },
      highway: {
        status: 'none',
        value: ""
      },
    }
  },
  methods: {
    toNextStep(stepValue) {
      this.getActiveStage.checkedValue = stepValue
      if (this.stageNow === 1) {
        this.stages[0].checkedValue === 0 ? this.stageNow++ : this.stageNow += 2;
      } else if (this.stageNow === 2) {
        this.stageNow += 2;
      } else if (this.stageNow === 7) {
        stepValue === 0 ? this.plane = true : this.finish = true;

      } else {
        this.stageNow++;
      }
    },
    toPrevStep() {
      if (this.stageNow === 4) {
        this.stages[0].checkedValue === 0 ? this.stageNow = 2 : this.stageNow = 3;
      } else if (this.stageNow !== 4 && !this.plane && !this.finish) {
        this.stageNow--
      } else if (this.plane) {
        this.plane = false
      } else if (this.finish) {
        this.finish = false
        this.stages[7].checkedValue === 0 ? this.plane = true : ''
      }
    },
    skipStep() {
      this.stageNow === 4 ? this.stageNow++ : this.stageNow
    },
    skipPlane() {
      this.plane = false;
      this.finish = true;
    },
    validateInput(event, min, max, rule, value) {
      if (value.value.length > max) {
        value.value = value.value.substring(0, max)
        console.log(value.value)
      }
      if (!value.value.length) {
        value.status = "error"
      } else {
        value.status = "success"
      }
    },
    focusInput(event) {
      const ph = event.target.parentNode.parentNode
      ph.classList.add('focus')
    },
    blurInput(event) {
      const ph = event.target.parentNode.parentNode
      ph.classList.remove('focus')
    },
  },
  computed: {
    getActiveStage() {
      return this.stages[this.stageNow]
    },
    backIsVisible() {
      return (this.stageNow === 2 || this.stageNow === 4 ||
        this.stageNow === 5 || this.stageNow === 6 ||
        this.stageNow === 7) && !this.finish
    },
    calculatePercents() {
      if (!this.plane && !this.finish) {
        return this.getActiveStage.percents
      } else if (this.plane) {
        return 81
      } else {
        return 95
      }
    }
  }
});

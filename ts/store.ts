interface IState {
  count: number;
  todoList: Todo[];
}

interface IStore<S = any> {
  commit: (type: string, payload: any, option?: any) => void;
  dispatch(type: string, payload: any): void;
  state: S;
  getters: Record<string, any>;
}

interface Todo {}

interface IGetter<S> {
  (state: S): void;
}

interface IGetters<S> {
  [key: string]: IGetter<S>;
}

interface IMutations<S> {
  [key: string]: (state: S, payload: any) => void;
}

interface IActions<S> {
  [key: string]: (store: S, data: any) => void;
}

const state: IState = {
  count: 1,
  todoList: []
};

const getters: IGetters<IState> = {
  getCount(state) {
    return state.count;
  },
  getTodoList(state) {
    return state.todoList;
  }
};

const mutations: IMutations<IState> = {
  setCount(state, payload: number) {
    state.count = payload;
  },
  setTodoList(state, payload: Todo[]) {
    state.todoList = payload;
  }
};

const actions: IActions<IStore> = {
  getCount({ commit }, data) {
    const result = 1;
    setTimeout(() => commit('setCount', result), 3000);
  }
};

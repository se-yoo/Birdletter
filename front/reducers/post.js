export const initialState = {
  mainPosts: [
    {
      // 더미 데이터
      id: 1,
      User: {
        id: 1,
        nickname: "홍길동",
      },
      content: "첫번째 게시글",
      Images: [
        {
          src: "https://storage.blip.kr/collection/295867b72822b70e15434e651ca5557d.jpg",
        },
        {
          src: "https://pbs.twimg.com/media/EBhXRnCUIAAw3cC.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "stay",
          },
          content: "귀여워요",
        },
        {
          User: {
            nickname: "순이",
          },
          content: "ㅎㅎ",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미 데이터입니다.",
  User: {
    id: 1,
    nickname: "홍길동",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;

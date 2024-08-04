// * 请求响应参数(不包含data)
declare interface IResult {
  code: string
  message: string
}

// * 请求响应参数(包含data)
declare interface IResultData<T = any> extends IResult {
  data?: T
}

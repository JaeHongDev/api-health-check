export enum ApiType {
    observatory= "관측소",
    tideStation="조위 관측소",
}

export enum ApiStatus{
    RUNNING="실행중",
    PENDING="대기중",
    END="종료",
}

export enum ApiRunnableStatus{
    NOT_START ="시작하지 않음",
    SUCCESS="성공",
    FAIL="실패"
}

export interface SubObservatory{
    name: string;
    code: string;
    status: ApiStatus
    runnableStatus: ApiRunnableStatus

}


export interface ApiModel{
    /**
     * @description
     * api 호출 유형
     */
    type: ApiType

    /**
     * @description
     * api 경로
     */
    path: string

    subObservatory: SubObservatory[],

    createUrl: (input: string) => string

}

const baseUrl = "http://www.khoa.go.kr/api";
const serviceKey =  "wldhxng34hkddbsgm81lwldhxng34hkddbsgm81l==";
const apiUnit1: ApiModel = {
    type: ApiType.observatory,
    path: `${baseUrl}/oceangrid/ObsServiceObj/search.do?ServiceKey=${serviceKey}&ResultType=json`,
    subObservatory: []
}
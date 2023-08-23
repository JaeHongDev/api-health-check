export enum ApiType {
    ObsServiceObj='관측소별 데이터 제공현황',
    tideObsRecent='관측소 실측 기온',
    buObsRecent='해양관측부이 최신 관측데이터',
    tideObs='관측소실측조위',
    tideObsPre='관측소예측조위',
    tideCurPre='관측소 실측&예측 조위',
    tideObsPreTab='조석예보',
    tideObsHar='관측소조화상수',
    tideBedPre='TideBED예측조위',
    tideShortLong='비실시간 장단기 조위',
    obsWaveHight='관측소 실측 염분',
    fcTidalCurrent='조류예보',
    tidalPreTab='조류예보 최강 창낙조 및 전류',
    tidalBu='해양관측부이 실측 유향 유속',
    tidalHfRadar='해수유동 관측소 실측 유향 유속',
    romsCurrent='황동중국해(모델) 예측 유향 유속',
    tidalCurrentArea='해양관측부이 실측 기압',
    tidalCurrentAreaGeoJson='해양관측부이 실측 기압',
    tidalCurrentPoint='수치조류도 지점별 최강창낙조',
    tideObsTemp='조위관측소 실측 수온',
    tidalBuTemp='해양관측부이 실측 수온',
    romsTemp='황동중국해(모델) 예측 수온',
    tideObsSalt='관측소 실측 염분',
    tideObsAirTemp='관측소 실측 기온',
    tidalBuAirTemp='해양관측부이 실측 기온',
    tideObsAirPres='관측소 실측 기압',
    tidalBuAirPres='해양관측부이 실측 기압',
    tideObsWind='관측소 실측 풍향/풍속',
    tidalBuWind='해양관측부이 실측 풍향/풍속',
    seafog='해무예측 정보',
    seafogReal='해무관측소 최신 관측 데이터',
    fcServiceInfo='해양관측부이 실측 기압',
    fcIndexOfType='해양관측부이 실측 기압',
    fcIndexOfShip='해양관측부이 실측 기압',
    ripCurrentRecent='해수욕장정보',
    ripCurrent='해수욕장정보',
    preOcean='해황예보도',
    beach='해수욕장정보',
    tbm='기본수준점',
    gridInfo='격자별 단계 정보',
    gridObsInfo='격자별 관측소 정보',
    radioActivity='관측소 실측 풍향/풍속',
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

    subObservatory: SubObservatory[] | [],

    createUrl: (input: string) => string

}

package com.jpmp.api.service.live;

import com.jpmp.api.dto.request.live.LiveDto;

import java.util.List;

public interface LiveService {
    public void register(LiveDto dto);

    public List<LiveDto> getLiveList();

    void finishLive(int roomId);

    public LiveDto getLive(int roomId);

    public int getmaxCost(int roomId);
}

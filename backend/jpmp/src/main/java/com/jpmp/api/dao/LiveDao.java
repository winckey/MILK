package com.jpmp.api.dao;

import com.jpmp.api.dto.request.live.LiveDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LiveDao {
    public void register(LiveDto dto);

    public List<LiveDto> getLiveList();

    void finishLive(int roomId);

    public LiveDto getLive(int roomId);
}

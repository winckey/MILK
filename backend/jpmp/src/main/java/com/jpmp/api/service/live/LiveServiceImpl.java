package com.jpmp.api.service.live;

import com.jpmp.api.dao.LiveDao;
import com.jpmp.api.dto.request.live.LiveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveServiceImpl implements LiveService{
    private final LiveDao liveDao;

    @Override
    public void register(LiveDto dto) {
        liveDao.register(dto);
    }

    @Override
    public List<LiveDto> getLiveList() {
        return liveDao.getLiveList();
    }

    @Override
    public void finishLive(int roomId) {
        liveDao.finishLive(roomId);
    }

    @Override
    public LiveDto getLive(int roomId) {
        return liveDao.getLive(roomId);
    }

    @Override
    public int getmaxCost(int roomId) {
        return liveDao.getmaxCost(roomId);
    }
}

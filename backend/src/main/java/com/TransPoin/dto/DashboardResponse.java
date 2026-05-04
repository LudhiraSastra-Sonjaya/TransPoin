package com.TransPoin.dto;


public class DashboardResponse {
    private Long totalUsers;
    private Long totalPerjalanan;
    private Long totalFeedback;
    private Long totalLayanan;
    private Long totalPenukaranBerhasil;
    private Integer totalPoinDistribusi;


    // Generated Constructors, Getters and Setters
    public DashboardResponse() {
    }

    public DashboardResponse(Long totalUsers, Long totalPerjalanan, Long totalFeedback, Long totalLayanan, Long totalPenukaranBerhasil, Integer totalPoinDistribusi) {
        this.totalUsers = totalUsers;
        this.totalPerjalanan = totalPerjalanan;
        this.totalFeedback = totalFeedback;
        this.totalLayanan = totalLayanan;
        this.totalPenukaranBerhasil = totalPenukaranBerhasil;
        this.totalPoinDistribusi = totalPoinDistribusi;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalPerjalanan() {
        return totalPerjalanan;
    }

    public void setTotalPerjalanan(Long totalPerjalanan) {
        this.totalPerjalanan = totalPerjalanan;
    }

    public Long getTotalFeedback() {
        return totalFeedback;
    }

    public void setTotalFeedback(Long totalFeedback) {
        this.totalFeedback = totalFeedback;
    }

    public Long getTotalLayanan() {
        return totalLayanan;
    }

    public void setTotalLayanan(Long totalLayanan) {
        this.totalLayanan = totalLayanan;
    }

    public Long getTotalPenukaranBerhasil() {
        return totalPenukaranBerhasil;
    }

    public void setTotalPenukaranBerhasil(Long totalPenukaranBerhasil) {
        this.totalPenukaranBerhasil = totalPenukaranBerhasil;
    }

    public Integer getTotalPoinDistribusi() {
        return totalPoinDistribusi;
    }

    public void setTotalPoinDistribusi(Integer totalPoinDistribusi) {
        this.totalPoinDistribusi = totalPoinDistribusi;
    }

}

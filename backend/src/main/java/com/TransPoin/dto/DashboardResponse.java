package com.TransPoin.dto;

public class DashboardResponse {
    private Long totalUsers;
    private Long totalPerjalanan;
    private Long totalPerjalananPending;
    private Long totalPerjalananApproved;
    private Long totalFeedback;
    private Long totalLayanan;
    private Long totalHalte;
    private Long totalPenukaranBerhasil;
    private Integer totalPoinDistribusi;

    // Constructors
    public DashboardResponse() {
    }

    public DashboardResponse(Long totalUsers, Long totalPerjalanan, Long totalPerjalananPending,
                              Long totalPerjalananApproved, Long totalFeedback, Long totalLayanan,
                              Long totalHalte, Long totalPenukaranBerhasil, Integer totalPoinDistribusi) {
        this.totalUsers = totalUsers;
        this.totalPerjalanan = totalPerjalanan;
        this.totalPerjalananPending = totalPerjalananPending;
        this.totalPerjalananApproved = totalPerjalananApproved;
        this.totalFeedback = totalFeedback;
        this.totalLayanan = totalLayanan;
        this.totalHalte = totalHalte;
        this.totalPenukaranBerhasil = totalPenukaranBerhasil;
        this.totalPoinDistribusi = totalPoinDistribusi;
    }

    // Getters and Setters
    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getTotalPerjalanan() { return totalPerjalanan; }
    public void setTotalPerjalanan(Long totalPerjalanan) { this.totalPerjalanan = totalPerjalanan; }

    public Long getTotalPerjalananPending() { return totalPerjalananPending; }
    public void setTotalPerjalananPending(Long totalPerjalananPending) { this.totalPerjalananPending = totalPerjalananPending; }

    public Long getTotalPerjalananApproved() { return totalPerjalananApproved; }
    public void setTotalPerjalananApproved(Long totalPerjalananApproved) { this.totalPerjalananApproved = totalPerjalananApproved; }

    public Long getTotalFeedback() { return totalFeedback; }
    public void setTotalFeedback(Long totalFeedback) { this.totalFeedback = totalFeedback; }

    public Long getTotalLayanan() { return totalLayanan; }
    public void setTotalLayanan(Long totalLayanan) { this.totalLayanan = totalLayanan; }

    public Long getTotalHalte() { return totalHalte; }
    public void setTotalHalte(Long totalHalte) { this.totalHalte = totalHalte; }

    public Long getTotalPenukaranBerhasil() { return totalPenukaranBerhasil; }
    public void setTotalPenukaranBerhasil(Long totalPenukaranBerhasil) { this.totalPenukaranBerhasil = totalPenukaranBerhasil; }

    public Integer getTotalPoinDistribusi() { return totalPoinDistribusi; }
    public void setTotalPoinDistribusi(Integer totalPoinDistribusi) { this.totalPoinDistribusi = totalPoinDistribusi; }
}

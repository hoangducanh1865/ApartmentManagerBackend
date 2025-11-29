package com.example.demoapi.repository;

import com.example.demoapi.model.Invoice;
import com.example.demoapi.model.RefreshToken;
import com.example.demoapi.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    boolean existsByHouseid_Houseid(Integer houseId); // Kiểm tra xem nhà này có hóa đơn nào không
}
export class OneEuroFilter {
	// Thuộc tính private
	private min_cutoff: number; // Ngưỡng cắt tối thiểu (f_c_min)
	private beta: number; // Hệ số bù trễ
	private d_cutoff: number; // Ngưỡng cắt cho đạo hàm (f_d)
	private freq: number; // Tần số lấy mẫu (không dùng trực tiếp trong filter, nhưng có thể dùng để tính t_e)

	// Thuộc tính trạng thái
	private x_prev: number = 0.0; // Giá trị đã lọc trước đó
	private dx_prev: number = 0.0; // Đạo hàm đã lọc trước đó
	private t_prev: number | null = null; // Thời gian lọc trước đó (tính bằng giây)

	constructor(
		min_cutoff: number = 1.0,
		beta: number = 0.0,
		d_cutoff: number = 1.0,
		freq: number = 30
	) {
		this.freq = freq;
		this.min_cutoff = min_cutoff;
		this.beta = beta;
		this.d_cutoff = d_cutoff;
	}

	private smoothingFactor(t_e: number, cutoff: number): number {
		const r = 2 * Math.PI * cutoff * t_e;
		return r / (r + 1);
	}

	private exponentialSmoothing(a: number, x: number, x_prev: number): number {
		return a * x + (1 - a) * x_prev;
	}

	public filter(t: number, x: number): number {
		// Trường hợp khởi tạo lần đầu
		if (this.t_prev === null) {
			this.t_prev = t;
			this.x_prev = x;
			this.dx_prev = 0.0;
			return x;
		}

		const t_e = t - this.t_prev; // Thời gian trôi qua (time elapsed)

		// Tránh chia cho 0 hoặc lỗi thời gian
		if (t_e <= 0) {
			return this.x_prev;
		}
		// --- 1. Lọc Đạo hàm (Đánh giá Tốc độ thay đổi) ---
		const a_d = this.smoothingFactor(t_e, this.d_cutoff);
		const dx = (x - this.x_prev) / t_e;
		const dx_hat = this.exponentialSmoothing(a_d, dx, this.dx_prev);

		// --- 2. Lọc Giá trị chính (Giá trị x) ---
		const cutoff = this.min_cutoff + this.beta * Math.abs(dx_hat);

		// Tính hệ số làm mịn cho giá trị chính
		const a = this.smoothingFactor(t_e, cutoff);

		// Lọc giá trị chính (x_hat)
		const x_hat = this.exponentialSmoothing(a, x, this.x_prev);

		// --- 3. Cập nhật Trạng thái ---
		this.x_prev = x_hat;
		this.dx_prev = dx_hat;
		this.t_prev = t;

		return x_hat;
	}
}
